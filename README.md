
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### **Database:** postgres

In project, I use `validationSchema` of `ConfigModule` to validate enviroment variable

### **Auth:** Using jwt token
### **Testing:** Using jest

In project, I have just only implemented tests for `tasks.service.ts` in `tasks.service.spec.ts`(src/tasks/\__tests\__/tasks.service.spec.ts)


## How generate new module:

```
nest generate res <name>
```
## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test


