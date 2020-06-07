<template>
    <layout1>
        <LoginElement/>
    </layout1>
</template>

<script>
import Layout1 from '../layouts/Layout1'
import LoginElement from '../services/LoginElement'

export default {
  name: 'LoginView',
  components: {
    Layout1,
    LoginElement
  }
}
</script>
