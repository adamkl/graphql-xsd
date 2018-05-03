#!/usr/bin/env node
const generateXsd = require("./generateXsd");
const program = require("commander");
const package = require("./package.json");

program
  .name("graphql-xsd")
  .version(package.version)
  .option(
    "-s, --schema <schema>",
    "either local schema path/glob or remote schema uri"
  )
  .option("-o, --output [filename]", "filename for generated xsd", "schema.xsd")
  .option(
    "-n, --namespace [namespace]",
    "uri to use for xsd namespace",
    "http://example.com/graphql"
  )
  .option(
    '-h, --header ["header: value"]',
    "additional http header to send with introspection request"
  )
  .parse(process.argv);

const { schema, output, namespace, header } = program;
generateXsd(schema, output, namespace, header);
