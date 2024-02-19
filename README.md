# Hashmap

Implemented a hash map data structure using JavaScript. It contains the following methods:

1. `hash(key)` takes a key and produces a hash code with it;
2. `set(key, value)` takes two arguments, the first is a key and the second is a value that is assigned to this key;
3. `get(key)` takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null;
4. `has(key)` takes a key as an argument and returns true or false based on whether or not the key is in the hash map;
5. `remove(key)` takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false;
6. `length()` returns the number of stored keys in the hash map;
7. `clear()` removes all entries in the hash map;
8. `keys()` returns an array containing all the keys inside the hash map;
9. `values()` returns an array containing all the values;
10. `entries()` returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
