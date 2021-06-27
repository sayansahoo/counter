import React, { useState } from "react";

const useStyles = ({ counter }) => ({
  counterBox: {
    display: "flex",
    justifyContent: "center",
    margin: "150px auto",
    boxSizing: "border-box",
    fontSize: 29,
  },
  div1: {
    height: 56,
    width: 60,
    border: "1px solid #B24242",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    borderRight: "none",
    color: "#B24242",
    cursor: "pointer",
    fontWeight: "bold",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
  div2: {
    height: 56,
    width: 60,
    border: "1px solid #B24242",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FBE8E8",
  },
  input: {
    width: "95%",
    height: "80%",
    outline: "none",
    border: "none",
    background: "#FBE8E8",
    textAlign: "center",
    color: "#B24242",
    fontWeight: "bold",
    fontSize: counter > 999 ? 22 : counter > 99 ? 25 : 29,
  },
  div3: {
    height: 56,
    width: 60,
    border: "1px solid #B24242",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#B24242",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: "bold",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
  },
});

const Counter = ({ MAX = 1000, MIN = 1 }) => {
  const [counter, setCounter] = useState(MIN);

  const styles = useStyles({ counter });

  const onValueChange = (e) => {
    const value = e.target.value;
    if (isNaN(+value) || (!isNaN(+value) && +value > MAX)) return;
    setCounter(value);
  };

  const onAdd = () => {
    if (+counter >= MAX) return;
    setCounter(+counter + 1);
  };

  const onSubstract = () => {
    if (+counter <= MIN) return;
    setCounter(+counter - 1);
  };

  return (
    <div style={styles.counterBox}>
      <div onClick={onSubstract} style={styles.div1}>
        -
      </div>
      <div style={styles.div2}>
        <input
          type="text"
          style={styles.input}
          value={counter}
          onChange={onValueChange}
        />
      </div>
      <div onClick={onAdd} style={styles.div3}>
        +
      </div>
    </div>
  );
};

export default Counter;
