const { createApp, ref, onMounted, watch } = Vue;

const app = createApp({
  setup() {
    const destinationNumber = ref(null);
    const inputValidaton = ref(false)
    const arrayNumber = ref([]);
    const arrayIndices = ref([]);

    const fillArray = () => {
      for (let i = 0; i < 10; i++) {
        arrayNumber.value.push(Math.floor(Math.random() * 100) + 1);
      }
    };

    const searchIndexes = () => {
      if(!destinationNumber.value){
        inputValidaton.value = true
      } else {
        inputValidaton.value = false
      } 

      const matchedIndices = [];
      arrayNumber.value.map((num, index) => {
        const currentIndex = index;
        for (const [i, number] of arrayNumber.value.entries()) {
          if (i != currentIndex) {
            const sum = num + number;
            if (sum === destinationNumber.value) {
              matchedIndices.push({ value1: currentIndex, value2: i });
            }
          }
        }
      });
      arrayIndices.value = matchedIndices;
    };

    watch(inputValidaton, (newValue) => {
        if(newValue){
            setTimeout(() => {
                return inputValidaton.value = false    
            }, 2000);
        }
    })

    onMounted(() => {
      fillArray();
    });

    return {
      destinationNumber,
      inputValidaton,
      arrayNumber,
      arrayIndices,
      fillArray,
      searchIndexes
    };
  },
});

app.mount("#app");
