const path = require("path");
const directoryExists = require("directory-exists").sync;
const {
    SERVER_PASSWORD,
    SERVER_PORT,
    SERVER_USERNAME,
    clean,
    createWebDAVClient,
    createWebDAVServer,
    restoreRequests,
    useRequestSpy
} = require("../../helpers.node.js");

describe("createDirectory", function() {
    beforeEach(function() {
        this.client = createWebDAVClient(`http://localhost:${SERVER_PORT}/webdav/server`, {
            username: SERVER_USERNAME,
            password: SERVER_PASSWORD
        });
        clean();
        this.server = createWebDAVServer();
        this.requestSpy = useRequestSpy();
        return this.server.start();
    });

    afterEach(function() {
        restoreRequests();
        return this.server.stop();
    });

    it("creates directories", async function() {
        const newDir = path.resolve(__dirname, "../../testContents/sub2");
        expect(directoryExists(newDir)).to.be.false;
        await this.client.createDirectory("/sub2");
        expect(directoryExists(newDir)).to.be.true;
    });

    it("allows specifying custom headers", async function() {
        await this.client.createDirectory("/sub2", {
            headers: {
                "X-test": "test"
            }
        });
        const [requestOptions] = this.requestSpy.firstCall.args;
        expect(requestOptions)
            .to.have.property("headers")
            .that.has.property("X-test", "test");
    });

    describe("with recursive option", function() {
        it("supports creating deep directories", async function() {
            const newDir = path.resolve(__dirname, "../../testContents/a/b/c/d/e");
            expect(directoryExists(newDir)).to.be.false;
            await this.client.createDirectory("/a/b/c/d/e", { recursive: true });
            expect(directoryExists(newDir)).to.be.true;
        });

        it("supports creating deep directories which partially exist", async function() {
            const newDir = path.resolve(__dirname, "../../testContents/sub1/a/b");
            expect(directoryExists(newDir)).to.be.false;
            await this.client.createDirectory("/sub1/a/b", { recursive: true });
            expect(directoryExists(newDir)).to.be.true;
        });

        it("has no effect when all paths exist", async function() {
            await this.client.createDirectory("/a/b/c", { recursive: true });
            await this.client.createDirectory("/a/b/c", { recursive: true });
            await this.client.createDirectory("/a", { recursive: true });
        });
    });
});
