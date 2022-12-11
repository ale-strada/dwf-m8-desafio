import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "./hooks";

export async function postPet(petData, token) {
  const res = await fetch("https://pet-finder-app.onrender.com/pets", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify({
      petName: petData.petName,
      description: petData.description,
      lat: petData.lat,
      lng: petData.lng,
      ubication: petData.ubication,
      pictureURL: petData.pictureURL,
      email: petData.email,
    }),
  });
  const data = await res.json();
  const petPosted = await data;
  return petPosted;
}

export async function editPet(petData, token) {
  const res = await fetch(
    "https://pet-finder-app.onrender.com/pets/" + petData.id,
    {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        petName: petData.petName,
        description: petData.description,
        lat: petData.lat,
        lng: petData.lng,
        ubication: petData.ubication,
        pictureURL: petData.pictureURL,
        email: petData.email,
      }),
    }
  );
  const data = await res.json();
}

export async function getPetById(id, token) {
  const res = await fetch("https://pet-finder-app.onrender.com/pets/" + id, {
    method: "get",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
  const data = await res.json();
  const pet = await data;
  return pet;
}

export const petGeoLocState = atom({
  key: "petgeoloc",
  default: [],
});

export const pictureURLState = atom({
  key: "petpictureURL",
  default: "",
});

export const myPetsLostState = atom({
  key: "petslost",
  default: [],
});

export const myPetsState = selector({
  key: "PullMyPets",
  get: async ({ get }) => {
    const editedPet = get(petEditState);
    const token = get(tokenState);
    if (token) {
      const res = await fetch("https://pet-finder-app.onrender.com/pets/me", {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + token,
        },
      });
      const data = await res.json();
      return data;
    }
  },
});

export function useMyPetsState() {
  const [petsLost, setPetsLost] = useRecoilState(myPetsLostState);
  const myPets = useRecoilValue(myPetsState);
  useEffect(() => {
    if (myPets) {
      setPetsLost(myPets);
    }
  }, [myPets]);
  return petsLost;
}

export const petEditState = atom({
  key: "petedit",
  default: {},
});
