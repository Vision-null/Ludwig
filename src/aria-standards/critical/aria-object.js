const ariaObject = {

  areaAltText: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H24.html',
      desc: '```<area>``` elements of image maps should have alternate text.'
  },

  elementRole: {
      link: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles'
  ,
      desc: 'Element role must support ARIA attributes.' 
  },

  ariaHidden: {
      link: 'https://www.w3.org/TR/wai-aria-1.1/#aria-hidden',
      desc: '```aria-hidden=”true”``` should not be present on the document body.'
  },

  requiredAttributes: {
      link: 'https://www.w3.org/TR/wai-aria/#introroles',
      desc: 'Elements with ARIA roles are required to have all required ARIA attributes.',
      additionalLinks: ['https://www.w3.org/TR/wai-aria-1.1/#state_prop_taxonomy']
  },

  childRoles: {
      link: 'https://www.w3.org/TR/wai-aria-1.1/#roles',
      desc: 'Elements with ARIA role that require child roles contain them.'
  },

  requiredParent: {
      link: 'https://www.w3.org/TR/wai-aria-1.1/#roles',
      desc: 'Elements with an ARIA role that require parent roles are contained by them.'
  },

  validValueForRole: {
      link: 'https://www.w3.org/TR/wai-aria-1.1/#roles',
      desc: 'All elements with a role attribute use a valid value.',
      additionalLinks: ['https://a11ysupport.io/tests/tech__html__role-attribute']
  },
   
  allAriasAreValid: {
      link: 'https://www.w3.org/TR/wai-aria-1.1/#states_and_properties',
      desc: 'All ARIA attributes must be valid attributes.'
  },

  discernibleButtonText: {
      link: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role',
      desc: 'Buttons should have discernible text.'
  },

  uniqueIDs: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F77.html',
      desc: 'IDs must be unique.'
  },

  imageAlts: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F65.html',
      desc: '```<img>``` elements require alternate text or a role of none or presentation.',
      additionalLinks: ['https://www.w3.org/WAI/WCAG21/Techniques/html/H37.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/html/H67.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA10.html']
  },

  inputButton: {
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types',
      desc: 'Inputs require discernible text values.'
  }, 

  inputImageAltText: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F65.html',
      desc: '```<input type=”image”>``` elements require alternative text.',
      additionalLinks: ['https://www.w3.org/WAI/WCAG21/Techniques/html/H36.html']
  },

  formsHaveLabels: {
      link: 'https://www.w3.org/WAI/tutorials/forms/labels/',
      desc: 'All forms must have appropriate labels.',
      additionalLinks: ['https://www.w3.org/WAI/WCAG21/Techniques/failures/F68.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/html/H44.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA16.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14.html',
          'https://www.w3.org/WAI/WCAG21/Techniques/html/H65.html']
  },

  metaEquivRefresh: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H76.html',
      desc: '```<meta http-equiv=”refresh”>``` should not be used for delayed refresh.',
      additionalLinks: ['https://www.w3.org/WAI/WCAG21/Techniques/failures/F41.html']
  },

  metaViewport: {
      link: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
      desc: '```<meta name=”viewport”>``` should not disable text scaling and zooming.'
  },

  selectHasAccessName: {
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select',
      desc: 'Select elements should have accessibile name.'
  },

  videoCaptions: {
      link: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G87.html',
      desc: '```<video>``` elements must have captions.',
      additionalLinks: ['https://www.w3.org/WAI/WCAG21/Techniques/general/G93.html']
  },

  anchorLabel: {
    link: 'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8.html',
    desc: 'Provide an aria-label attribute with a descriptive text label on a link.'
  },

};


module.exports = {
    ariaObject
};