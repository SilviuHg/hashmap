function hashMap() {
  let capacity = 16;

  let hashMap = Array(capacity)
    .fill(null)
    .map(() => []);

  function getHashMap() {
    return hashMap;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function loadFactor() {
    // if capacity reaches more than 75%, grow more buckets
    if (length() > 0.75 * capacity) {
      const oldEntries = entries(); // save old data
      capacity *= 2;
      const newHashMap = Array(capacity)
        .fill(null)
        .map(() => []);

      hashMap = newHashMap; // create new array with double capacity
      oldEntries.forEach((element) => set(element[0], element[1])); // copy data over to new array
    }
  }

  function set(key, value) {
    let index = hash(key);

    if (index < 0 || index >= getHashMap().length) {
      throw new Error("Trying to access index out of bound");
    } else {
      let bucket = getHashMap()[index];

      if (bucket.length === 0) {
        // If bucket is empty, simply add the new node
        bucket.push({ key: key, value: value, nextNode: null });
      } else {
        // If bucket is not empty, check if the key exists
        let currentNode = bucket[0];
        while (currentNode !== null) {
          // If key already exists, update its value
          if (currentNode.key === key) {
            currentNode.value = value;
            break; // Exit loop after updating
          }
          // If not at the end of the linked list, move to the next node
          if (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
          } else {
            // If at the end of the linked list, append the new node
            currentNode.nextNode = { key: key, value: value, nextNode: null };
            break; // Exit loop after appending
          }
        }
      }
    }
    loadFactor(); // check if loadFactor is reached
  }

  function get(key) {
    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        // Check if the key exists in the linked list within the bucket
        let currentNode = bucket[0];
        while (currentNode !== null) {
          if (currentNode.key === key) {
            return currentNode.value; // Return the value associated with the key
          }
          // Move to the next node in the linked list
          currentNode = currentNode.nextNode;
        }
      }
    }
    return null; // Key not found in any bucket
  }

  function has(key) {
    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];
        while (currentNode !== null) {
          if (currentNode.key === key) {
            return true;
          }
          currentNode = currentNode.nextNode;
        }
      }
    }
    return false;
  }

  function remove(key) {
    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];
        let previousNode = null;

        while (currentNode !== null) {
          if (currentNode.key === key) {
            if (previousNode === null) {
              // If the key is found in the first node of the linked list and it's not the only node, update it
              if (currentNode.nextNode !== null) {
                bucket[0] = currentNode.nextNode;
              } else {
                bucket.shift(); // Remove the first node if it's the only node
              }
            } else {
              // If the key is found in a middle or last node of the linked list
              previousNode.nextNode = currentNode.nextNode; // Skip over the current node
            }
            return true; // Key removed successfully
          }
          // Move to the next node in the linked list
          previousNode = currentNode;
          currentNode = currentNode.nextNode;
        }
      }
    }

    return false;
  }

  function length() {
    let count = 0;

    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];

        while (currentNode !== null) {
          count++;
          currentNode = currentNode.nextNode;
        }
      }
    }
    return count;
  }

  function clear() {
    getHashMap().forEach((bucket) => bucket.shift());
  }

  function keys() {
    let arrayOfKeys = [];

    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];

        while (currentNode !== null) {
          arrayOfKeys.push(currentNode.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return arrayOfKeys;
  }

  function values() {
    let arrayOfValues = [];

    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];

        while (currentNode !== null) {
          arrayOfValues.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return arrayOfValues;
  }

  function entries() {
    let arrayEntries = [];

    for (let i = 0; i < getHashMap().length; i++) {
      let bucket = getHashMap()[i];

      if (bucket.length > 0) {
        let currentNode = bucket[0];

        while (currentNode !== null) {
          arrayEntries.push([currentNode.key, currentNode.value]);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return arrayEntries;
  }

  return {
    getHashMap,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    loadFactor,
  };
}

const myHashMap = hashMap();
myHashMap.set("number", 1);
myHashMap.set("Carlos", "old value");
myHashMap.set("Carlos", "new value");
myHashMap.set("numero", 2);

//myHashMap.clear();
//myHashMap.remove("number");
console.log(myHashMap.get("Carlos"));
console.log(myHashMap.has("Carlos"));
console.log(myHashMap.length());
console.log(myHashMap.keys());
console.log(myHashMap.values());
console.log(myHashMap.entries());
console.log(myHashMap.getHashMap());
