import piface.pfio
import BaseHTTPServer

piface.pfio.init()
relay = piface.pfio.Relay(1)

class PiServer(BaseHTTPServer.BaseHTTPRequestHandler):
	def do_GET(self):
		relay.toggle()
		print "Toggle"
		self.send_response(200)

httpd = BaseHTTPServer.HTTPServer(('', 8000), PiServer)
httpd.serve_forever()
