import React, { useState, memo, useEffect } from "react";

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

  useEffect(() => {
    const func = async () => {
      const res = await apiCall(true);
      setCounter(res);
    };
    func();
  }, []);

  const apiCall = async (flag, body) => {
    const url1 = ` https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json`;
    const url2 = `https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json`;
    const url = flag ? url1 : url2;
    const response = await fetch(url, {
      method: flag ? "GET" : "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...(body ? { body: JSON.stringify(body) } : undefined),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url// body data type must match "Content-Type" header
    });
    return response.json();
  };

  const onAdd = async () => {
    if (+counter >= MAX) return;
    setCounter(+counter + 1);
    const body = {
      counter1: +counter + 1,
    };
    await apiCall(false, body);
  };

  const onSubstract = async () => {
    if (+counter <= MIN) return;
    setCounter(+counter - 1);
    const body = {
      counter1: +counter - 1,
    };
    await apiCall(false, body);
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

export default memo(Counter);
