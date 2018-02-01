[![npm](https://img.shields.io/npm/dw/aor-embedded-array.svg)](https://www.npmjs.com/package/aor-embedded-array)
[![npm](https://img.shields.io/npm/v/aor-embedded-array.svg)](https://www.npmjs.com/package/aor-embedded-array)
[![npm](https://img.shields.io/npm/l/aor-embedded-array.svg)](https://www.npmjs.com/package/aor-embedded-array)
[![Travis](https://travis-ci.org/MhdSyrwan/aor-embedded-array.svg?branch=master)](https://travis-ci.org/MhdSyrwan/aor-embedded-array)
# aor-embedded-array

A custom field/input component for [Admin-on-rest](https://github.com/marmelab/admin-on-rest/) that provides the ability to represent embedded arrays.

## Installation

Install with:

```sh
npm install --save aor-embedded-array
```

or

```sh
yarn add aor-embedded-array
```

## Usage

Define the `Create` and `Edit` View like this:

```jsx
 <EmbeddedArrayInput source="links">
     <LongTextInput source="url" />
     <LongTextInput source="context" />
     <EmbeddedArrayInput source="metadata">
         <TextInput source="name" />
         <TextInput source="value" />
     </EmbeddedArrayInput>
 </EmbeddedArrayInput>
```

Define the `Show` and `List` View like this:

```jsx
 <EmbeddedArrayField source="links">
     <UrlField source="url" />
     <TextField source="context" />
     <EmbeddedArrayField source="metadata">
         <TextField source="name" />
         <TextField source="value" />
     </EmbeddedArrayField>
 </EmbeddedArrayField>
```

For primitive arrays, define the Views the same way but without the source prop for the unique child:

```jsx
 <EmbeddedArrayInput source="links">
     <LongTextInput />
 </EmbeddedArrayInput>
```
