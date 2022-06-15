<template>
  <div class="date-info">
    {{
      datetime
        .toLocaleDateString("en-US", {
          weekday: "long",
        })
        .toUpperCase()
    }}
    |
    {{
      datetime
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
        .toUpperCase()
    }}
  </div>
</template>

<script>
export default {
  props: {
    datetime: {
      type: Date,
    },
  },
};
</script>

<style lang="scss" scoped>
.date-info {
  margin-top: 10px;
  font-size: $fs-medium;
}
</style>