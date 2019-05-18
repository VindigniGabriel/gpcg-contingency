<template>
    <div>
<v-date-picker
  mode='range'
  v-model='selectedDate'
  show-caps>
</v-date-picker>


    </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: {
        start: new Date(2018, 0, 9),
        end: new Date(2018, 0, 18)
      }
    };
  },
};
</script>