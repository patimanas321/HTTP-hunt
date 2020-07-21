class ChallengeDescription {
    stage;
    statement;
    instructions;
    sampleInput;
    sampleOutput;

    constructor(responseFromAPI) {
        ({
            stage: this.stage,
            statement: this.statement,
            instructions: this.instructions,
            sampleInput: this.sampleInput,
            sampleOutput: this.sampleOutput
        } = responseFromAPI.data || {});
    }
}

module.exports = ChallengeDescription;