import { parseMicroDsl } from "../../lib/microDslParse";
import { dslInput, nodeCount } from "../../workers/mock_response";
describe("Unit Test: Micro DSL Parser Engine", () => {
    it("should parse valid DSL string into node/edge objects", () => {
        const result = parseMicroDsl(dslInput)

        expect(result).toHaveProperty('nodes')
        expect(result.nodes.length).toBe(nodeCount)
    });

    it('should throw error on invalid format instead of crashing node process', () => {
        expect(() => parseMicroDsl("INVALID RAW CODE BLOCK")).toThrow(
            "Failed to parse valid nodes or description from DSL payload"
        );
    });
})