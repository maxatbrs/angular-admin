Angular Admin 0.2.0
===

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Setup

First, download the project:

```bash
$ curl -LOk https://github.com/BigRoomStudios/angular-admin/archive/master.zip
$ unzip master.zip
$ mv angular-admin-master/ my-project/
$ cd my-project/
```

Then install dependencies:

```bash
$ npm i
```

### Running the App in Development
Run the app locally at http://localhost:9000

```bash
$ gulp serve
```

### Build
Run the build process manually

```bash
$ gulp build
```

### Run in Production Mode
To build in production mode and run locally at http://localhost:9000

```bash
$ gulp
```

### Mock JSON Server

This project uses [json-mock](https://github.com/therebelbeta/json-mock) to serve local data. To run the mock JSON server, open a new terminal window and:

```bash
$ json-mock stub.json
```

This will run the JSON mock API at [http://localhost:3000](http://localhost:3000)

## Testing

Running `gulp test` will run the unit tests with karma. `gulp serve` will run this in real time.

Coverage is reported in `coverage/` and an HTML report can be found at `coverage/report-html/index.html`

### Naming Conventions
Below are some naming conventions of the project:

 - snake-case for element id, classes, and file names
 - camelCase for definitions

## Yeoman Recipes
Below are a few helpful things when using yeoman to generate Angular code

### Creating a Route
Create a Route named {feature}-{action}

    yo angular:route {feature}-{action}

    yo angular:route asset-list

### Creating a Directive
Create a Route named {directive-name}

    yo angular:directive {directive-name}

    yo angular:directive asset-upload

### Creating a Service
Create a service named {service-name}-service , appending the keyword -service to the end

    yo angular:service {service-name}-service

    yo angular:service asset-service

### Creating a Factory
Create a factory named {factory-name}-factory , appending the keyword -factory to the end

    yo angular:factory {factory-name}-factory

    yo angular:factory asset-factory
