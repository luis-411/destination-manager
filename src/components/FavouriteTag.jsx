import { StarFilled, StarOutlined } from '@ant-design/icons';
import {create} from "zustand";
import {useToken} from "./AuthProvider/AuthProvider";
import {FavouritesApi} from "../api/favourites";

export const useFavourites = create((set, get) => ({
  favourites: [],
  fetcher: {},
  initialized: false,

  /**
   * Setup the fetcher and get favourites
   * @param{String} userId
   * @returns {Promise<void>}
   */
  async fetch(userId) {
    const token = useToken.getState().token;
    const fetcher = new FavouritesApi(
      `${process.env.REACT_APP_BACKEND_URL}/favourites/${userId}`,
      { Authorization: `bearer ${token}` },
    )
    const data = await fetcher.getFavourites();
    set({ favourites: data, fetcher, initialized: true });
  },

  async remove(country) {
    const items = get().favourites.filter(curr => curr.name !== country);
    const success = await get().fetcher.updateFavourite(items);
    if (success) {
      set({ favourites: items });
    }
  },
  /**
   *
   * @param{String} country
   * @param{Array[]} months
   * @returns {Promise<void>}
   */
  async add(country, months) {
    const item = { name: country, months: months?.join(',') };
    set((state) => ({ favourites: [...state.favourites, item ] }))
    const success = await get().fetcher.updateFavourite(get().favourites);
    if (!success) {
      set((state) => ({
        favourites: [...state.favourites.filter(i => i.country !== country) ]
      }))
    }
  }
}));


const FavouriteTag = ({ country }) => {
  const favourites = useFavourites();
  const isFavourite = favourites.favourites?.map(fav => fav.name).includes(country);
  const onClick = async (e) => {
    e.stopPropagation();
    if (!isFavourite) {
      await favourites.add(country, []);
    } else {
      await favourites.remove(country);
    }
  }
  return (
    <div id='favourite'>
      {isFavourite && <StarFilled onClick={onClick}/>}
      {!isFavourite && <StarOutlined onClick={onClick}/>}
    </div>
  )
};

export default FavouriteTag;