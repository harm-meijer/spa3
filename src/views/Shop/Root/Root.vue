<script src="./Root.js" />


<template>
  <router-view name="header" />
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocation('US')"
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
      v-on:click.prevent="() => setLocale('en')"
    >
      English
    </a>
  </div>
  <div>
    <a
      href="javascript:void"
      v-on:click.prevent="() => setLocale('de')"
    >
      German
    </a>
  </div>
  <h1>{{ location }}</h1>
  <h1>{{ locale }}</h1>
  <router-view />
  <router-view name="footer" />
</template>
