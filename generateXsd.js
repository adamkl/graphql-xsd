const { executeWithOptions } = require("graphql-code-generator/dist/cli");
const fs = require("fs");
const path = require("path");

const project = path.resolve(__dirname, ".");
const config = path.resolve(__dirname, "./gql-gen.json");
const namespaceHelper = path.resolve(process.cwd(), "namespace.js");
const ifNotPrimitiveHelpler = path.resolve(process.cwd(), "ifNotPrimitive.js");

module.exports = async (schema, output, namespace, header) => {
  try {
    createNamespaceHelper(namespace);
    const urlRegex = /^https?:\/\//i;
    let gen;
    if (urlRegex.test(schema)) {
      gen = await genRemote(schema, header);
    } else {
      gen = await genLocal(schema);
    }
    writeGen(gen, output);
  } catch (err) {
    console.log(err);
  } finally {
    removeHelpers([namespaceHelper]);
  }
};

const cliOptions = {
  project,
  config,
  schema: true
};

// This makes me sad, but it works.
const createNamespaceHelper = namespace => {
  fs.writeFileSync(
    namespaceHelper,
    `
module.exports = () => {
  return "${namespace}";
}
    `
  );
};

const removeHelpers = paths => {
  paths.forEach(path => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });
};

const genRemote = async (schema, header) => {
  return await executeWithOptions({
    ...cliOptions,
    url: schema,
    header
  });
};

const genLocal = async schema => {
  return await executeWithOptions({
    ...cliOptions,
    documents: schema
  });
};

const writeGen = (gen, output) => {
  fs.writeFileSync(output, gen[0].content);
};
