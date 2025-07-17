# ay  - Sort Without Articles

 I learned how to:
- Use the `.replace()` method to **remove articles** (`a`, `an`, `the`) from the beginning of strings.
- Sort an array of strings **without the leading articles** affecting the order.
- Display the sorted list **dynamically in the HTML** using DOM manipulation.

### 🧠 Key Concepts

- **Regular Expressions** to match and strip articles:
  ```js
  name.replace(/^(a |an |the )/i, '').trim()
