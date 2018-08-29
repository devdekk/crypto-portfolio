<template>
 <h1> {{ symbol }}  {{ tweeningValue }} </h1>
</template>

<script>
import TWEEN from '@tweenjs/tween.js';
export default {
  // Properties value and symnbol that are passed to component
  props: {
    value: {
      type: Number
    },
    symbol:{
        type: String
    },
    tweenDuration: {
      type: Number,
      default: 500
    }
  },

  watch: {
    // On update of total value start tweening animation
    value(newVal, oldVal) {
      this.tween(oldVal, newVal)
    }
  },
  data() {
    return {
      tweeningValue: 0,
      required: true
    }
  },

  mounted() {
    this.tween(0, this.value)
  },

  methods: {
    // Tween animation method
    tween(start, end) {
      let frameHandler

      // Update scope
      var vm = this;

      const animate = function (currentTime) {
        TWEEN.update(currentTime)
        frameHandler = requestAnimationFrame(animate)
      }

      const myTween = new TWEEN.Tween({ tweeningValue: start })
      .to({ tweeningValue: end }, this.tweenDuration)

      .onUpdate(function(tweenVal) {
        // This will reset the total value to 0 before the data is loaded again from API
        if (isNaN(tweenVal.tweeningValue)){
            vm.tweeningValue = 0
        }else{
            vm.tweeningValue = (tweenVal.tweeningValue.toFixed(2)).toLocaleString()      
        }
        
      })
      .onComplete(() => {
        cancelAnimationFrame(frameHandler)
      })
      .start()

      frameHandler = requestAnimationFrame(animate)
    }
  },
  
}
</script>