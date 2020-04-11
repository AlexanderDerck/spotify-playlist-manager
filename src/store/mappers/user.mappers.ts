import { User } from '../../models';
import { CurrentUsersProfileResponse } from '../../typings/spotify-api';

export function mapToUser(response: CurrentUsersProfileResponse): User {
  return {
    id: response.id,
    email: response.email,
    name: response.display_name,
  };
}
