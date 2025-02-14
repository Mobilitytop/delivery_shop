import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  item: {
    paddingVertical: 10,
  },
  itemInner: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  edit: {
    height: 40,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 40,
  },
  editText: {
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  itemContainer: { flex: 1, paddingRight: 10 },
  title: {
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 200,
  },
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: { fontSize: 13, lineHeight: 21 },
});

export default styles;
