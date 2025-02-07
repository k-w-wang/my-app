import { Button } from "antd";
export default function Page() {
  return (
    <div>
      <div id="home">main</div>
      <div id="about">About content</div>
      <div id="contact" className="p-4">Contact content</div>
      <Button type="primary">Button</Button>
    </div>
  );
}
