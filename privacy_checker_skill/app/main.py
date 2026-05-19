
from flask import Flask
from app.routes import main_bp

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max
    app.register_blueprint(main_bp)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
