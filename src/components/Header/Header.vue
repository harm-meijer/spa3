<script src="./Header.js" />

<template>
  <h1>Header</h1>
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocation('us')"
    >
      US
    </a>
  </div>
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocation('de')"
    >
      DE
    </a>
  </div>
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocale('EN')"
    >
      English
    </a>
  </div>
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocale('DE')"
    >
      German
    </a>
  </div>
  <h1>{{ location }}</h1>
  <h1>{{ locale }}</h1>
</template>

