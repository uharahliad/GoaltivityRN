import {createAsyncThunk} from '@reduxjs/toolkit';
import goals from '../../api/goals';
import actionItems from '../../api/actionItems';

export const getGoals = createAsyncThunk(
  'goals/fetch',
  async (data, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.id;
      const res = await goals.getGoals(userId);
      const allActionItems = await Promise.all(
        res.data.rows.map(async item => {
          const actionItem = await actionItems.getActionItems(item.id);

          return {
            ...item,
            actionItemsData: actionItem.data.rows,
          };
        }),
      );

      console.log('GOALS res =======>', allActionItems);
      return allActionItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
