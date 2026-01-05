"use client";

import Button from '../components/Button';

export default function ButtonExamplePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Button Component Examples</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Primary Buttons</h2>
        <div className="flex space-x-2">
          <Button variant="primary" size="small">Small Primary</Button>
          <Button variant="primary" size="medium">Medium Primary</Button>
          <Button variant="primary" size="large">Large Primary</Button>
        </div>
        <Button variant="primary" fullWidth>Full Width Primary</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Secondary Buttons</h2>
        <div className="flex space-x-2">
          <Button variant="secondary" size="small">Small Secondary</Button>
          <Button variant="secondary" size="medium">Medium Secondary</Button>
          <Button variant="secondary" size="large">Large Secondary</Button>
        </div>
        <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Danger Buttons</h2>
        <div className="flex space-x-2">
          <Button variant="danger" size="small">Small Danger</Button>
          <Button variant="danger" size="medium">Medium Danger</Button>
          <Button variant="danger" size="large">Large Danger</Button>
        </div>
        <Button variant="danger" fullWidth>Full Width Danger</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Outline Buttons</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="small">Small Outline</Button>
          <Button variant="outline" size="medium">Medium Outline</Button>
          <Button variant="outline" size="large">Large Outline</Button>
        </div>
        <Button variant="outline" fullWidth>Full Width Outline</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Custom Class Button</h2>
        <Button className="bg-purple-500 hover:bg-purple-700 text-white">Custom Purple Button</Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Button with onClick</h2>
        <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
      </div>
    </div>
  );
}
