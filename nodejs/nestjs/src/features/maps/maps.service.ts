import { Injectable } from '@nestjs/common';
import {
  Client as GMapsClient,
  PlaceDetailsRequest,
  PlaceDetailsResponseData,
} from '@googlemaps/google-maps-services-js';

import { GOOGLE_MAPS_API_KEY } from './utils/constants';

@Injectable()
export class GoogleMapsService {
  #googleMapsApiKey: string;
  #googleMapsClient: GMapsClient;

  constructor() {
    this.#googleMapsApiKey = GOOGLE_MAPS_API_KEY;
    this.#googleMapsClient = new GMapsClient();
  }

  /**
   * Method to fetch placeDetails from GoogleMaps
   * @param placeId string
   * @returns PlaceDetailsResponseData
   */
  async getPlaceDetails(placeId: string): Promise<PlaceDetailsResponseData> {
    try {
      const request: PlaceDetailsRequest = {
        params: {
          place_id: placeId,
          key: this.#googleMapsApiKey,
        },
      };
      const response = await this.#googleMapsClient.placeDetails(request);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
