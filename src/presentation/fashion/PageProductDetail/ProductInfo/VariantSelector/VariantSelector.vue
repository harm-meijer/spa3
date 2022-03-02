<script src="./VariantSelector.js"></script>

<template>
  <div v-for="[label, variants] in variants" :key="label">
    <label>
      {{ label }}
      <select v-on:change="variantChange(label, $event)">
        <option
          v-for="variant in variants"
          :key="variant"
          :value="variant"
          :selected="isSelected(label, variant)"
        >
          {{ variant }}
        </option>
      </select>
    </label>
  </div>
</template>
