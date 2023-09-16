<script>
import { mapGetters } from 'vuex' 
import CompBaseView from "./CompBaseView.vue";

export default {
  extends: CompBaseView,
  name: "Login",
  data() {
    return {
      knumber: "",
      password: "",
      error: false,
      keyboardControls: true,
      itemsData: "",
    };
  },

  mounted() {
  },

  computed: {
    ...mapGetters(['storeInitialized','loggedIn', 'loggedInUser'])
  },

  methods: {
    logInUser(userId, password){
      this.$store.commit('loginUser', { userId, password });
      if(this.loggedIn) {
        this.$router.push("/")
      } else {
        this.error = true;
      }
    }
  }
}
</script>

<template>
  <div class="login">
    <!-- <img src="./logo-screenshot.png" alt="Nexus Logo"> -->
    <div class="logo">
      <div class="nexus">
        NEXUS
      </div>
      <div class="universum">
        UNIVERSUM
      </div>
    </div>
    <h1>Welcome!</h1>
    <div v-if="error == true" class="error">
      Wrong Password or K-Number
    </div>
    <input autocapitalize="none" v-model="knumber" type="text" class="number" placeholder="K-Number">
    <input autocapitalize="none" v-model="password" type="password" class="password" placeholder="Password" @keyup.enter="logInUser(knumber, password)">
    <RouterLink class="link" to="/resetPassword">
      Forgot Password?
    </RouterLink>
    <button id="submitButton" class="button primary submit" @click="logInUser(knumber, password)">
      Login
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";
img {
  width: 280px;
  padding-bottom: 15px;
}
h1 {
  font-weight: $font-weight-subheading;
  padding-bottom: 10px;
}
input {
  border: none;
  background-color: $color-extralightgrey;
  -webkit-appearance: none;
  border-radius: 15px;
  width: 65%;
  height: 50px;
  text-indent: 20px; 
}
input:focus {
  outline: 2px solid $color-primary;
}
::placeholder {
  color: $color-subtext;
  font-family: "Inter";
  font-size: 15px;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  padding-top: 4rem;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
    
    .nexus{
      color: $color-black;
      font-weight: 900;
      font-size: 35px;
      margin-bottom: -10px;
    }
    .universum{
      color: $color-black;
      font-weight: 900;
      font-size: 45px;
    }
    
  }
  .error{
    color: $color-primary;
    font-family: "Inter";
    font-size: 12px;
    font-weight: $font-weight-subheading;
  }
  .link {
    font-size: 15px;
    margin-top: -5px;
    color: $color-lightgrey;
    font-family: "Inter";
  }
  .submit {
    height: 50px;
    width: 100px;
    font-size: 25px;
    margin-top: 35px;
    padding-bottom: 5px;
  }
}
</style>
