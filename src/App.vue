<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p
    v-else
    v-for="character in result.characters.results"
    :key="character.id"
  >
    {{ character.name }}
  </p>
  <div><HelloWorld /></div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import HelloWorld from './components/HelloWorld.vue';

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default {
  name: 'App',
  setup() {
    const { result, loading, error } = useQuery(
      CHARACTERS_QUERY
    );
    return {
      result,
      loading,
      error,
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
