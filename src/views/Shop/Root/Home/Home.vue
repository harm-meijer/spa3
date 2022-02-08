<script src="./Home.js"></script>

<template>
  <h1>Home</h1>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p
    v-else
    v-for="character in characters"
    :key="character.id"
  >
    {{ character.name }}
  </p>
</template>
