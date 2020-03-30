import { CookingDuration } from '../overmind/recipes/models';

export const formatDuration = (duration: CookingDuration | undefined) => {
  switch (duration) {
    case CookingDuration.LessThan15: {
      return '< 15 min';
    }
    case CookingDuration.Between15And30: {
      return '15 - 30 min';
    }
    case CookingDuration.Between30And60: {
      return '30 - 60 min';
    }
    case CookingDuration.Between60to90: {
      return '1 - 1.5 h';
    }
    case CookingDuration.Between90to120: {
      return '1.5 - 2 h';
    }
    case CookingDuration.Between2to3hrs: {
      return '2 - 3 h';
    }
    case CookingDuration.Between3to6hrs: {
      return '3 - 6 h';
    }
    case CookingDuration.Between6to12hrs: {
      return '6 - 12 h';
    }
    case CookingDuration.Between12to24hrs: {
      return '12 - 24 h';
    }
    case CookingDuration.Over24hrs: {
      return 'over 24 h';
    }

    default:
      return 'Not defined';
  }
};
