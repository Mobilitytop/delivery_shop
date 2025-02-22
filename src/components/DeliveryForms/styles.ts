import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 22,
  },
  labelWrapper: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 20,
    paddingLeft: 13,
    flex: 1,
  },
  inputs: {
    flexDirection: 'row',
    gap: 12,
  },
  required: {
    color: 'red',
    marginLeft: 4,
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 21,
    height: 40,
    width: 130,
    backgroundColor: '#138808',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'flex-start',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  search: {
    position: 'relative',
    zIndex: 1000,
  },
  searchResult: {
    borderWidth: 1,
    borderColor: '#ececec',
    paddingHorizontal: 13,
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    maxHeight: 132,
  },
  searchResultItem: {
    borderBottomWidth: 1,
    borderColor: '#ececec',
    paddingVertical: 13,
  },
  searchResultText: {},
});

export default styles;
