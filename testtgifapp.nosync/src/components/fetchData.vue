<template>
    <div>
    </div>
</template>

<script>
export default {
    name: 'appFetch',
    props: ['url'],
    data() {
        return {
            data: null,
        }
    },
    created() {
    // getting the data dynamically/asychronously using AJAX
    fetch(this.url , {
    method: "get",
    headers: {
        "X-API-Key" : "9PxBtcchx3OZS4CHGYPU8VD0nG68lNGgic8kiU73"
    }
    }).then(response => {
        if (response.status !== 200) {
            console.log("Looks like theres a problem. Status is "+response.status);
            return;
        }
        response.json().then(data => {
            this.data = data.results[0].members;
            console.log("ProPublica Response is good");
        })
    })
  },
  watch: {
      data: function() {
          this.$emit('data-response', this.data)
      }
  }
}
</script>