export const colorVariant = (color, type) => {
  const variants = {
    red: {
      shadow: 'shadow-red-400',
      text: 'text-red-400',
      border: 'border-red-400',
      bg: 'bg-red-400',
    },
    amber: {
      shadow: 'shadow-amber-400',
      text: 'text-amber-400',
      border: 'border-amber-400',
      bg: 'bg-amber-400',
    },
    purple: {
      shadow: 'shadow-purple-400',
      text: 'text-purple-400',
      border: 'border-purple-400',
      bg: 'bg-purple-400',
    },
    green: {
      shadow: 'shadow-green-400',
      text: 'text-green-400',
      border: 'border-green-400',
      bg: 'bg-green-400',
    },
    orange: {
      shadow: 'shadow-orange-400',
      text: 'text-orange-400',
      border: 'border-orange-400',
      bg: 'bg-orange-400',
    },
    cyan: {
      shadow: 'shadow-cyan-400',
      text: 'text-cyan-400',
      border: 'border-cyan-400',
      bg: 'bg-cyan-400',
    },
    neutral: {
      shadow: 'shadow-neutral-400',
      text: 'text-neutral-400',
      border: 'border-neutral-400',
      bg: 'bg-neutral-400',
    },
    indigo: {
      shadow: 'shadow-indigo-400',
      text: 'text-indigo-400',
      border: 'border-indigo-400',
      bg: 'bg-indigo-400',
    },
    teal: {
      shadow: 'shadow-teal-400',
      text: 'text-teal-400',
      border: 'border-teal-400',
      bg: 'bg-teal-400',
    },
    sky: {
      shadow: 'shadow-sky-400',
      text: 'text-sky-400',
      border: 'border-sky-400',
      bg: 'bg-sky-400',
    },
  };

  return variants[color][type];
};

export const colors = [
  'red',
  'amber',
  'cyan',
  'purple',
  'orange',
  'green',
  'neutral',
  'indigo',
  'teal',
  'sky',
];
