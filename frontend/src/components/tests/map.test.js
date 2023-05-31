import renderer from 'react-test-renderer';
import Map from '../map'

describe('Map component', () => {
  test('renders the map with a marker', () => {
    const component = renderer.create(<Map />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
