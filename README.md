# graphql-xsd

[![Greenkeeper badge](https://badges.greenkeeper.io/adamkl/graphql-xsd.svg)](https://greenkeeper.io/)

A simple graphql-to-xsd generator (inelegantly leveraging [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator))

## Install

```
npm install -g graphql-xsd
```

## Usage

```
  Usage: graphql-xsd [options]

  Options:

    -V, --version                   output the version number
    -s, --schema <schema>           either local schema path/glob or remote schema uri
    -o, --output [filename]         filename for generated xsd (default: schema.xsd)
    -n, --namespace [namespace]     uri to use for xsd namespace (default: http://example.com/graphql)
    -h, --header ["header: value"]  additional http header to send with introspection request
    -h, --help                      output usage information
```
