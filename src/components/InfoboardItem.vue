<script>
export default {
  props: {
    item: {
      type: Object,
      default: undefined,
    }
  },
  data() {
    return {
    };
  },
};
</script>

<template>
  <RouterLink :to="{ name: item.type, params: { uuid: item.uuid } }">
    <div class="container-infoboardItem">
      <div class="icon course">
        <svg
          width="22px"
          version="1.1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m117.33 93.332h-10.664v-28.148c2.9453 0 5.332-2.3867 5.332-5.332v-13.391h5.332c2.4219 0 4.5391-1.6289 5.1602-3.9688 0.62109-2.3398-0.41406-4.8008-2.5156-6l-53.332-30.461c-1.6406-0.9375-3.6484-0.9375-5.2891 0l-53.332 30.461c-2.1016 1.1992-3.1367 3.6602-2.5156 6 0.62109 2.3398 2.7383 3.9688 5.1602 3.9688h5.332v13.332c-0.015625 1.4258 0.53906 2.7969 1.5391 3.8086 1.0039 1.0156 2.3711 1.582 3.793 1.582v28.207l-10.664 0.003906c-1.418-0.003906-2.7734 0.55469-3.7773 1.5586-1 1-1.5586 2.3555-1.5586 3.7734v18.605c0 1.418 0.55859 2.7734 1.5586 3.7773 1.0039 1 2.3594 1.5586 3.7773 1.5586h106.66c1.418 0 2.7734-0.55859 3.7773-1.5586 1-1.0039 1.5586-2.3594 1.5586-3.7773v-18.664c0-1.418-0.55859-2.7734-1.5586-3.7773-1.0039-1-2.3594-1.5586-3.7773-1.5586zm-53.332-76.527 33.184 18.965h-66.367zm-37.332 29.629h74.668l-0.003907 8.0859h-74.668zm69.332 18.75v28.207l-10.668 0.003906v-28.211zm-21.332 0v28.207l-21.336 0.003906v-28.211zm-32 0v28.207l-10.668 0.003906v-28.211zm69.332 46.816h-96v-8h96z" />
        </svg>        
      </div>

      <div class="text">
        <p class="name">{{ item.title }}</p>
        <p class="description">
          {{ item.info }} | 
          {{ item.prof }} | 
          {{ item.ortRaum }}
        </p>
      </div>
      <div class="more">
        <svg version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="m708.54 491.46v-302.71c0-59.953-48.602-108.54-108.54-108.54-59.953 0-108.54 48.602-108.54 108.54v302.7l-302.71 0.003907c-59.953 0-108.54 48.602-108.54 108.54 0 59.953 48.602 108.54 108.54 108.54h302.7v302.7c0 59.953 48.602 108.54 108.54 108.54 59.941 0 108.54-48.602 108.54-108.54l0.003906-302.69h302.7c59.953 0 108.54-48.602 108.54-108.54 0-59.941-48.602-108.54-108.54-108.54z"/>
        </svg>    
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 208px;
}
.container-infoboardItem {
  width: 100%;
  height: 70px;
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 1fr;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  // box-shadow: 0px 0px 10px -1px lightgrey;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px;
  gap: 10px;
  background-color: $color-lightgrey;

  .icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: auto;
  border: none;

  & path {
    fill: $color-white;
  }

  &.course {
    background-color: $color-course;
  } 

  }
  .text{
    display: flex;
    flex-direction: column;
    .name {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: auto;
      color: $color-maintext;
      text-transform: capitalize;
      margin-top: -1px;
    }

    .description {
      font-size: 12px;
      text-transform: capitalize;
      font-weight: $font-weight-maintext;
      font-family: "Inter";
      color: $color-subtext;
      margin-top: -6px;
    }
  }
  .more {
    transform: rotate(-90deg);
    border: none;
    background-color: transparent;
    width: 18px;
    height: 18px;
    fill: $color-darkgrey;
    margin-left: auto;
  }
}
</style>
