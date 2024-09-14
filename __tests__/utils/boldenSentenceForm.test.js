import { boldenSentenceForm } from '../../src/utils';

describe('boldenSentenceForm', () => {
  describe('when form is not present', () => {
    it('should return the sentence content wrapped in a <Text> component', () => {
      const sentence = {
        content: 'That was technologically sound.',
        id: '123'
      };

      expect(boldenSentenceForm(sentence)).toMatchSnapshot();
    });
  });

  describe('when form is present', () => {
    it('should return the sentence wrapped in a <Text> component with the form wrapped in a boldened <Text> component', () => {
      const sentence = {
        content: 'That was technologically sound.',
        form: 'technologically',
        id: '123'
      };

      expect(boldenSentenceForm(sentence)).toMatchSnapshot();
    });

    it('when content contains words that partially match the form, it should not bolden any part of that word', () => {
      const sentence = {
        content:
          'After showing his styler the style he wanted, he styled his hair stylishly until it was perfectly styled in the style he wanted.',
        form: 'style',
        id: '123'
      };

      expect(boldenSentenceForm(sentence)).toMatchSnapshot();
    });
  });
});
