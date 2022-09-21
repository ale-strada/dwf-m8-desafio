import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilValue, selector, useRecoilState } from "recoil";
import { petEditState } from "./hooksPets";

const userLocState = atom({
  key: "userloc",
  default: "",
});

const petsResultsState = selector({
  key: "searchPets",
  get: async ({ get }) => {
    const geoLoc = get(userLocState);
    const editedPet = get(petEditState);
    if (geoLoc) {
      const res = await fetch(
        "https://dwf-m7-final.herokuapp.com/pets/cerca-de?" + geoLoc
      );
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  },
});

export function useSearchPets() {
  const params = useParams();
  const currentLoc = {
    lat: params.lat,
    lng: params.lng,
  };

  const [Loc, setLocValue] = useRecoilState(userLocState);
  useEffect(() => {
    if (currentLoc) {
      const q = "lat=" + currentLoc.lat + "&lng=" + currentLoc.lng;
      setLocValue(q);
    }
  }, [params]);

  const results = useRecoilValue(petsResultsState);
  return results;
}

//---------------- USER---------------------------------
export const userLoginState = atom({
  key: "userlogin",
  default: {},
});

export const tokenState = atom({
  key: "token",
  default: "",
});

export const newUserState = atom({
  key: "newuser",
  default: {},
});

export const getUserToken = selector({
  key: "PullUsertoken",
  get: async ({ get }) => {
    const userLogin: any = get(userLoginState);
    if (userLogin.email) {
      const res = await fetch("https://dwf-m7-final.herokuapp.com/auth/token", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: userLogin.email,
          password: userLogin.password,
        }),
      });
      const data = await res.json();
      return data;
    }
  },
});
export function loadLocalToken() {
  const [token, setToken] = useRecoilState(tokenState);
  const localToken = localStorage.getItem("token");
  useEffect(() => {
    setToken(localToken);
  });
}

export function useToken() {
  const params = useParams();
  const [token, setToken] = useRecoilState(tokenState);
  const newToken = useRecoilValue(getUserToken);

  useEffect(() => {
    if (newToken) {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    }
  }, [params]);

  return newToken;
}

export const userState = atom({
  key: "user",
  default: {},
});

export const userDataState = selector({
  key: "PullUserData",
  get: async ({ get }) => {
    const token = get(tokenState);
    const user = get(userState);
    if (token) {
      const res = await fetch("https://dwf-m7-final.herokuapp.com/me", {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + token,
        },
      });
      const data = await res.json();
      return data;
    } else {
      return {};
    }
  },
});

export function useUserState() {
  const [user, setUser] = useRecoilState(userState);
  const token = useToken();
  const userData = useRecoilValue(userDataState);

  if (userData) {
    useEffect(() => {
      setUser(userData);
    }, [token]);
  }
  return user;
}

export async function signup(newUserData) {
  const res = await fetch("https://dwf-m7-final.herokuapp.com/auth", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: newUserData.email,
      fullName: newUserData.fullName,
      password: newUserData.password,
    }),
  });
  const data = await res.json();
  return data;
}

export async function updateUser(userData, token, id) {
  const res = await fetch("https://dwf-m7-final.herokuapp.com/me/update", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify({
      userId: id,
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
    }),
  });
  const data = await res.json();
}

export async function deletePet(id, token) {
  const res = await fetch("https://dwf-m7-final.herokuapp.com/pets/" + id, {
    method: "delete",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
  const data = await res.json();
}
