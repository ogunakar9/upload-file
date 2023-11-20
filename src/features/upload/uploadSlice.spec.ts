import uploadReducer from //   increment, //   CounterState,
//   decrement,
//   incrementByAmount,
"./uploadSlice";

describe("counter reducer", () => {
  const initialState = {
    value: 3,
    status: "idle",
  };
  //   it("should handle initial state", () => {
  //     expect(uploadReducer(undefined, { type: "unknown" })).toEqual({
  //       value: 0,
  //       status: "idle",
  //     });
  //   });

  //   it("should handle increment", () => {
  //     const actual = uploadReducer(initialState, increment());
  //     expect(actual.value).toEqual(4);
  //   });

  //   it("should handle decrement", () => {
  //     const actual = uploadReducer(initialState, decrement());
  //     expect(actual.value).toEqual(2);
  //   });

  //   it("should handle incrementByAmount", () => {
  //     const actual = uploadReducer(initialState, incrementByAmount(2));
  //     expect(actual.value).toEqual(5);
  //   });
  it("should handle incrementByAmount", () => {
    // const actual = uploadReducer(initialState, incrementByAmount(2));
    // expect(actual.value).toEqual(5);
  });
});
