import os
import sys
import piface.pfio
import SimpleHTTPServer

os.chdir(sys.argv[1])

piface.pfio.init()
relay = piface.pfio.Relay(1)

class PiServer(SimpleHTTPServer.SimpleHTTPRequestHandler):
  def do_POST(self):
    relay.toggle()
    self.send_response(200)

httpd = SimpleHTTPServer.BaseHTTPServer.HTTPServer(('', 80), PiServer)
httpd.serve_forever()
