import { expect } from "chai";
import CompareAssignments from "../CompareAssignments";

describe("********** CompareAssignments use case ********", () => {
  const Assignment = {
    create: (data) => Promise.resolve(data),
  };

  const assignmentValidation = {
    submissionSchema: {
      validate: () => Promise.resolve({ error: null }),
    },
  };

  const historyRepository = {
    save: (data) => Promise.resolve(data),
  };

  it("compareText - identical texts", () => {
    const compare = new CompareAssignments({ Assignment, assignmentValidation, historyRepository });
    const similarity = compare.compareText("I am happy", "I am happy");

    expect(similarity).to.be.a("number");
    expect(similarity).to.be.lte(1);
    expect(similarity).to.equal(1);
  });

  it("compareText - non-identical texts", () => {
    const compare = new CompareAssignments({ Assignment, assignmentValidation, historyRepository });
    const similarity = compare.compareText("I am happy", "This is great");

    expect(similarity).to.be.a("number");
    expect(similarity).to.be.lte(1);
    expect(similarity).to.equal(0);
  });

  it("extractSentences", () => {
    const text = "My name is George. How are you?";
    const compare = new CompareAssignments({ Assignment, assignmentValidation, historyRepository });
    const sentences = compare.extractSentences(text);
    expect(sentences).to.be.an("array");
    expect(sentences.length).to.equal(2);
  });
});
