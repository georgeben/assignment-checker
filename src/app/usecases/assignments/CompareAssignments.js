// import util from "util";
import natural from "natural";
import stopwords from "stopword";
import FileHelper from "helpers/File";
import UseCase from "../../UseCase";

/**
 * @typedef {Object} Match
 * @property {String} sentenceA - Similar sentence in first submission
 * @property {String} sentenceB - Similar sentence in second submission
 */

/**
 * @typedef {Object} ComparisonResult
 * @property {Number} similarity - Degree of similarity
 * @property {Match[]} matches - Matching sentences
 */

const sentenceTokenizer = new natural.SentenceTokenizer();

/**
 * Compares two submissions for similarity
 */
class CompareAssignments extends UseCase {
  constructor({ Assignment, assignmentValidation, historyRepository }) {
    super();
    this.Assignment = Assignment;
    this.assignmentValidation = assignmentValidation;
    this.historyRepository = historyRepository;
  }

  /**
   * Compares the lexical similarity of two string of text
   * @param {String} firstText - Text to compare
   * @param {String} secondText - Text to compare
   * @returns { Number }
   */
  compareText(firstText, secondText) {
    // Remove whitespace
    const first = firstText.replace(/\s+/g, "");
    const second = secondText.replace(/\s+/g, "");

    if (first === second) return 1; // identical
    if (first.length < 2 || second.length < 2) {
      // if either is a 0-letter or 1-letter string
      return 0;
    }

    const firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i += 1) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i += 1) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize += 1;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  }

  /**
   * Tokenize a block of text into sentences.
   * @param {String} text - Text
   * @returns {String[]}
   */
  extractSentences(text) {
    return sentenceTokenizer.tokenize(text);
  }

  /**
   * Parses text to remove unnecessary characters
   * @param {String} text - text
   * @returns {String}
   */
  parseText(text) {
    let result = stopwords.removeStopwords(text.split(" "));
    result = result.map((word) => natural.LancasterStemmer.stem(word));
    return result.join(" ");
  }

  /**
   * Compares two assignment submissions for similarity
   * @param {Assignment} firstSubmission - First assignment
   * @param {Assignment} secondSubmission - Second assignment
   * @returns { Object }
   */
  async compareSubmissions(firstSubmission, secondSubmission) {
    const sentencesInA = [...new Set(this.extractSentences(firstSubmission.content))];
    const sentencesInB = [...new Set(this.extractSentences(secondSubmission.content))];

    const similarities = [];

    for (let i = 0; i < Math.min(sentencesInA.length, sentencesInB.length); i += 1) {
      const sentenceA = {
        originalSentence: sentencesInA[i],
        parsedSentence: this.parseText(sentencesInA[i]),
      };

      const sentenceB = {
        originalSentence: sentencesInB[i],
        parsedSentence: this.parseText(sentencesInB[i]),
      };

      const similarity = this.compareText(
        sentenceA.parsedSentence,
        sentenceB.parsedSentence,
      );

      similarities.push({
        score: similarity,
        sentenceA,
        sentenceB,
      });
    }
    const averageSimilarity = (
      similarities.reduce((acc, curr) => acc + curr.score, 0) / similarities.length
    );
    const matches = similarities
      .filter((el) => el.score > 0.7)
      .map((el) => ({
        firstSentence: el.sentenceA.originalSentence,
        secondSentence: el.sentenceB.originalSentence,
      }));
    return {
      similarity: averageSimilarity,
      matches,
    };
  }

  async execute({ firstSubmission, secondSubmission }) {
    const { submissionSchema } = this.assignmentValidation;
    const { error } = submissionSchema.validate(
      { firstSubmission, secondSubmission },
      {
        abortEarly: true,
        allowUnknown: false,
      },
    );
    if (error) {
      const e = new Error(error.details[0].message);
      e.name = "ValidationError";
      throw e;
    }

    const [contentA, contentB] = await Promise.all([
      FileHelper.getContent(firstSubmission.path),
      FileHelper.getContent(secondSubmission.path),
    ]);

    const assignmentA = this.Assignment.create({
      student: firstSubmission.student,
      content: contentA,
    });

    const assignmentB = this.Assignment.create({
      student: secondSubmission.student,
      content: contentB,
    });

    const result = await this.compareSubmissions(assignmentA, assignmentB);
    const response = await this.historyRepository.save({
      firstStudent: firstSubmission.student,
      secondStudent: secondSubmission.student,
      similarity: result.similarity,
      matches: result.matches,
    });
    return response;
  }
}

export default CompareAssignments;
