import userEndpoints from "@/lib/endpoints/user-endpoints";
import dataService from "@/lib/services/data-service";
import { setUser } from "@/lib/store/slices/userSlice";

export function getUser(userID: number) {
  let endpoint = { ...userEndpoints.getUser };
  endpoint.url = endpoint.url + "/" + userID;
  const request = dataService.get(endpoint);
  return (dispatch: React.Dispatch<any>) => {
    request.then((response: any) => {
      dispatch(setUser(response.data));
    });
  };
}
