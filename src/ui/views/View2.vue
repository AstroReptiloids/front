<template>
    <layout>
        <Component1 slot="c1"/>
        <Component2 slot="c2"/>
        <Component3 slot="c3"/>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout2'
import Component1 from '../services/Component1'
import Component2 from '../services/Component2'
import Component3 from '../services/Component3'

export default {
  name: 'View2',
  components: {
    Layout,
    Component1,
    Component2,
    Component3
  }
}
</script>
