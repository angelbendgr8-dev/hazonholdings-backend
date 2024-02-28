import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';
import {getBaseUrl} from '../../utils/constants';

export const ProfileApi = createApi({
  reducerPath: 'ProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/users`,
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).userAuth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    addProfilePicture: builder.mutation({
      query: (credentials) => ({
        url: '/update/profile/pics',
        method: 'POST',
        body: credentials,
        formData:true,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: credentials => ({
        url: 'update/profile/info',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAddProfilePictureMutation, useUpdateProfileInfoMutation} = ProfileApi;
