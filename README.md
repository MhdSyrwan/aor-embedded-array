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

In your `App.js` or wherever you want to call `<Admin>` component define the `restClientRouter` like this

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

