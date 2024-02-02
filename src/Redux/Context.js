import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useFirestore from "../hooks/useFirestore";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { projectFireStore } from "../firebase/config";

// const initialState=[...useFirestore('images')];

const initialState = [];
export const updateStateAsync = createAsyncThunk(
  'data/updateStateAsync',
  async ({temp,uid,}) => {
    console.log("temp",temp)
  const storeRef = doc(projectFireStore, "images",uid,'Photoes',temp.id);
  // Set the "capital" field of the city 'DC'
  console.log("storeRef",storeRef)
 const response= await updateDoc(storeRef, {
    url:temp.url,
    favourite:temp.favourite,
    createAt:temp.createAt

  });
    return temp;
});
export const deleteStateAsync=createAsyncThunk(
  'data/deleteStateAsyn',
  async ({temp,uid})=>{
    const storeRef = doc(projectFireStore, "images",uid,'Photoes',temp.id);
    await deleteDoc(storeRef);
  }
)


export const ActivityContext = createSlice({
  name: "activity",
  initialState,
  reducers: {
   
    add: (state, action) => {
      state = action.payload;
      let arr=[...state]
        return [...state]
    },
    
    
  },
 
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateStateAsync.fulfilled, (state, action) => {
      // Add user to the state array
    //   state.entities.push(action.payload
    console.log("fulfliedstate",state)
    console.log("fulllied action",action.payload)
    
    state=state.map((doc)=>{
      if(doc.id===action.payload.id){
        return {
          ...doc,
          favourite:action.payload.favourite
        }
      }
      return doc;
    })
    return [...state]
    })
    builder.addCase(deleteStateAsync.fulfilled,(state,action)=>{
      state=state.filter((doc)=>doc.id!==action.payload.id);
      return [...state];
    })
  },
});
export const { favourite, add } = ActivityContext.actions;
export default ActivityContext.reducer;
