const LinkedList = require('../linkedList.js').LinkedList;
const Node = require('../linkedList.js').Node;

// Naive solution - O(n) two passes with one pointer
// function insertKthFromEnd(list, value, k) {
//   let newNode = new Node(value);
//   let current = list.head;
//   let length = 0;
//   // find length of list
//   while (current) {
//     current = current.next;
//     length++;
//   }
//   // k is out of bounds
//   if (k > length) {
//     return false;
//   }
//   // insert new head
//   if (k === length) {
//     newNode.next = list.head;
//     list.head = newNode;
//     // for case in which node is being added to an empty list
//     if (newNode.next === null) {
//       list.tail = newNode;
//     }
//     return true;
//   }
//   // find parent node for insertion point
//   current = list.head;
//   let target = length - k - 1;
//   while(target > 0) {
//     current = current.next;
//     target--;
//   }
//   // insert node
//   newNode.next = current.next;
//   current.next = newNode;
//   // if inserted node is at the end of the list, update the tail
//   if (newNode.next === null) {
//     list.tail = newNode;
//   }
//   return true;
// }


// Optimal solution - O(n) one pass using two pointers
function insertKthFromEnd(list, value, k) {
  let newNode = new Node(value)
  let back = list.head;
  let front = list.head;
  // move front k nodes in front of back
  while (k > 0) {
    // k greater than length of list
    if (front === null) {
      return false;
    }
    front = front.next;
    k--;
  }
  // if k is the length of the list, front will be null
  // add node to front of list
  if (!front) {
    newNode.next = list.head;
    list.head = newNode;
    // for case in which node is being added to an empty list
    if (list.tail === null) {
      list.tail = newNode;
    }
    return true;
  }
  // move together until front is the last node of the list (its next pointer will be null)
  while(front.next) {
    back = back.next;
    front = front.next;
  }
  // the back node will be the parent of the inserted node
  newNode.next = back.next;
  back.next = newNode;
  // if inserted node is at the end of the list, update the tail
  if (newNode.next === null) {
    list.tail = newNode;
  }
  return true
};


// Regular sized list
let list = new LinkedList();
for (let i = 0; i <= 15; i++) {
  list.addTail(i);
}
console.log(list.head.value); // 0
console.log(list.tail.value); // 15
console.log(insertKthFromEnd(list, 'beginning', 16)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // 15
console.log(insertKthFromEnd(list, 'end', 0)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'too far', 25)); // false
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'middle', 4)); // true
console.log(insertKthFromEnd(list, 'middle', 13)); // true
let values = [];
let current = list.head;
while(current) {
  values.push(current.value);
  current = current.next;
}
console.log(values) // ['beginning', 0, 1, 2, 3, 4, 'middle', 5, 6, 7, 8, 9, 10, 11, 12, 'middle', 13, 14, 15, 'end']

// Two-item list
list = new LinkedList(0);
list.addTail(1);
console.log(list.head.value); // 0
console.log(list.tail.value); // 1
console.log(insertKthFromEnd(list, 'beginning', 2)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // 1
console.log(list.removeTail()); // 1
console.log(insertKthFromEnd(list, 'end', 0)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'too far', 25)); // false
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'middle', 1)); // true
console.log(insertKthFromEnd(list, 'middle', 3)); // true
values = [];
current = list.head;
while(current) {
  values.push(current.value);
  current = current.next;
}
console.log(values) // ['beginning', 'middle', 0, 'middle', 'end']

// One-item list
list = new LinkedList(0);
console.log(list.head.value); // 0
console.log(list.tail.value); // 0
console.log(insertKthFromEnd(list, 'beginning', 1)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // 0
console.log(list.removeTail()); // 0
console.log(insertKthFromEnd(list, 'end', 0)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'too far', 25)); // false
console.log(list.head.value); // beginning
console.log(list.tail.value); // end
console.log(insertKthFromEnd(list, 'middle', 1)); // true
console.log(insertKthFromEnd(list, 'middle', 2)); // true
values = [];
current = list.head;
while(current) {
  values.push(current.value);
  current = current.next;
}
console.log(values) // ['beginning', 'middle', 'middle', 'end']

// Empty list
list = new LinkedList();
console.log(list.head); // null
console.log(list.tail); // null
console.log(insertKthFromEnd(list, 'beginning', 0)); // true
console.log(list.head.value); // beginning
console.log(list.tail.value); // beginning
list = new LinkedList();
console.log(list.head); // null
console.log(list.tail); // null
console.log(insertKthFromEnd(list, 'beginning', 1)); // false
list = new LinkedList();
console.log(list.head); // null
console.log(list.tail); // null
console.log(insertKthFromEnd(list, 'beginning', 2)); // false
